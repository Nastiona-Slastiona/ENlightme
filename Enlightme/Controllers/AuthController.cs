using Enlightme.Core.Requests;
using Enlightme.Core.Responses;
using Enlightme.Dtos;
using Enlightme.Entities;
using Enlightme.Helpers;
using Enlightme.Models;
using Enlightme.Repositories;
using Enlightme.Services;
using Enlightme.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Enlightme.Controllers;

[Route("auth")]
[ApiController]
public class AuthController : Controller
{
    private readonly Repository<DataContext, User> userRepository;
    private readonly Repository<DataContext, RefreshToken> refreshTokenRepository;
    private readonly JwtHelper jwtHelper;
    private readonly AuthService authService;

    public AuthController(
        Repository<DataContext, User> userRepository,
        Repository<DataContext, RefreshToken> refreshTokenRepository,
        JwtHelper jwtHelper,
        AuthService authService)
    {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
        this.jwtHelper = jwtHelper;
        this.authService = authService;
    }

    [Route("register")]
    [HttpPost]
    public async Task<IActionResult> Register([FromForm] UserRegisterData userRegisterData)
    {
        User user = await authService.RegisterUser(userRegisterData);

        return Created("success", user);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserLoginData userLoginData)
    {
        var user = await userRepository.GetFirstOrDefault(BaseSpecification<User>.ByEmail(userLoginData.Email));

        if (user == null || !BCrypt.Net.BCrypt.Verify(userLoginData.Password, user.Password))
        {
            return BadRequest(new { message = "Invalid Credentials" });
        }

        AuthenticatedInfo authenticatedInfo = await authService.GetAuthenticatedInfo(user);
        Response.Cookies.Append("access", authenticatedInfo.AccessToken, new CookieOptions
        {
            HttpOnly = true
        });

        return Ok(authenticatedInfo);
    }

    [Route("refresh")]
    [HttpPost]
    public async Task<IActionResult> Refresh([FromBody]RefreshRequestInfo refreshRequest)
    {
        bool isValidRefreshToken = jwtHelper.Validate(refreshRequest.RefreshToken);

        if (!isValidRefreshToken)
        {
            return BadRequest(new ErrorResponse("Invalid token"));
        }

        var token = await refreshTokenRepository.GetFirstOrDefault(
            BaseSpecification<RefreshToken>.ByToken(refreshRequest.RefreshToken));

        if (token == null) 
        {
            return NotFound(new ErrorResponse("Invalid token"));
        }

        User user = await userRepository.GetFirstOrDefault(
            BaseSpecification<User>.ById(token.UserId));

        await refreshTokenRepository.Delete(token);

        if (user == null)
        {
            return NotFound(new ErrorResponse("Invalid token"));
        }

        AuthenticatedInfo authenticatedInfo = await authService.GetAuthenticatedInfo(user);

        await refreshTokenRepository.Create(new RefreshToken()
        { 
            Token = authenticatedInfo.RefreshToken,
            UserId = user.Id 
        });

        return Ok(authenticatedInfo);
    }

    [Authorize]
    [HttpDelete("logout")]
    public async Task<IActionResult> Logout()
    {
        Response.Cookies.Delete("access");

        var rawUserId = HttpContext.User.FindFirstValue("id");

        if(!int.TryParse(rawUserId, out int userId))
        {
            return Unauthorized();
        }

        await refreshTokenRepository.Delete(BaseSpecification<RefreshToken>.ByUserId(userId));

        return Ok(new SuccessResponse("Success"));
    }
}
