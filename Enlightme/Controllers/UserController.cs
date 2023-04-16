using Enlightme.Dtos;
using Enlightme.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Enlightme.Controllers;

[Route("api")]
[ApiController]
public class UserController : Controller
{
    private readonly UserService userService;

    public UserController(UserService userService)
    {
        this.userService = userService;
    }

    [Authorize]
    [HttpGet("user")]
    public async Task<IActionResult> User()
    {
        try
        {
            var jwt = Request.Cookies["access"];

            var user = await userService.GetUser(jwt);

            return Ok(user);
        }
        catch (Exception _)
        {
            return Unauthorized();
        }
    }

    [HttpGet("image")]
    public async Task<IActionResult> GetUserImage()
    {
        try
        {
            var jwt = Request.Cookies["access"];

            var user = await userService.GetUser(jwt);

            return Ok(user.Image);
        }
        catch (Exception _)
        {
            return Unauthorized();
        }
    }

    [HttpGet("settings")]
    public async Task<IActionResult> GetUserSettings()
    {
        try
        {
            var jwt = Request.Cookies["access"];

            var user = await userService.GetUser(jwt);

            return Ok(user);
        }
        catch (Exception _)
        {
            return Unauthorized();
        }
    }

    [HttpPost("settings")]
    public async Task<IActionResult> SetUserSettings([FromForm] UserSettingData userSettingData)
    {
        try
        {
            var user = await userService.SetUserSettings(userSettingData);

            return Ok(user);
        }
        catch (Exception _)
        {
            return Unauthorized();
        }
    }
}
