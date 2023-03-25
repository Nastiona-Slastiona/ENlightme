using Enlightme.Dtos;
using Enlightme.Entities;
using Enlightme.Helpers;
using Enlightme.Repositories;
using Enlightme.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace Enlightme.Controllers;

[Route("api")]
[ApiController]
public class AuthController : Controller
{
    private readonly Repository<DataContext, User> userRepository;
    private readonly JwtHelper jwtHelper;

    public AuthController(Repository<DataContext, User> userRepository, JwtHelper jwtHelper)
    {
        this.userRepository = userRepository;
        this.jwtHelper = jwtHelper;
    }

    [Route("register")]
    [HttpPost]
    public IActionResult Register(UserRegisterData userRegisterData)
    {
        var user = new User
        {
            FirstName = userRegisterData.FirstName,
            LastName = userRegisterData.LastName,
            Email = userRegisterData.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(userRegisterData.Password)
        };

        return Created("success", userRepository.Create(user));
    }

    [HttpPost("login")]
    public IActionResult Login(UserLoginData userLoginData)
    {
        var user = userRepository.GetFirstOrDefault(BaseSpecification.ByEmail(userLoginData.Email));

        if (user == null || !BCrypt.Net.BCrypt.Verify(userLoginData.Password, user.Password))
        {
            return BadRequest(new { message = "Invalid Credentials" });
        }

        var jwt = jwtHelper.Generate(user.Id);
        Response.Cookies.Append("jwt", jwt, new CookieOptions
        {
            HttpOnly = true
        });

        return Ok(new
        {
            message = "Success"
        });
    }

    [HttpGet("user")]
    public IActionResult User()
    {
        try
        {
            var jwt = Request.Cookies["jwt"];
            var token = jwtHelper.Verify(jwt);

            int userId = int.Parse(token.Issuer);

            var user = userRepository.GetFirstOrDefault(BaseSpecification.ById(userId));

            return Ok(user);
        }
        catch (Exception _)
        { 
            return Unauthorized();
        }
    }
}
