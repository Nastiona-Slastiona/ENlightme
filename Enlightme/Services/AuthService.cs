using Enlightme.Dtos;
using Enlightme.Entities;
using Enlightme.Helpers;
using Enlightme.Models;
using Enlightme.Repositories;
using Enlightme.Specifications;

namespace Enlightme.Services;

public class AuthService
{
    private readonly Repository<DataContext, User> userRepository;
    private readonly Repository<DataContext, RefreshToken> refreshTokenRepository;
    private readonly JwtHelper jwtHelper;
    private readonly IWebHostEnvironment hostEnvironment;

    public AuthService(
        Repository<DataContext, User> userRepository,
        Repository<DataContext, RefreshToken> refreshTokenRepository,
        JwtHelper jwtHelper,
        IWebHostEnvironment hostEnvironment)
    {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
        this.jwtHelper = jwtHelper;
        this.hostEnvironment = hostEnvironment;
    }

    public async Task<User> RegisterUser(UserRegisterData userRegisterData)
    {
        var user = new User
        {
            FirstName = userRegisterData.FirstName,
            LastName = userRegisterData.LastName,
            Email = userRegisterData.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(userRegisterData.Password)
        };

        if (userRegisterData.Image != null)
        {
            byte[]? imageData = null;

            using (var binaryReader = new BinaryReader(userRegisterData.Image.OpenReadStream()))
            {
                imageData = binaryReader.ReadBytes((int)userRegisterData.Image.Length);
            }

            user.Image = imageData;
        }

        return await userRepository.Create(user);
    }

    public async Task<User> GetUser(string accessToken)
    {
        var token = jwtHelper.Verify(accessToken);

        int userId = int.Parse(token.Claims.FirstOrDefault(c => c.Type == "id").Value);

        var user = await userRepository.GetFirstOrDefault(BaseSpecification<User>.ById(userId));

        return user;
    }

    public async Task<AuthenticatedInfo> GetAuthenticatedInfo(User user)
    {
        var accessToken = jwtHelper.GenerateAccessToken(user);
        var refreshToken = jwtHelper.GenerateRefreshToken();

        RefreshToken refreshTokenDto = new RefreshToken()
        {
            Token = refreshToken,
            UserId = user.Id,
        };

        await refreshTokenRepository.Create(refreshTokenDto);

        return (new AuthenticatedInfo
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken
        });
    }
}
