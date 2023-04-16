using Enlightme.Dtos;
using Enlightme.Entities;
using Enlightme.Helpers;
using Enlightme.Repositories;
using Enlightme.Specifications;
using System.IdentityModel.Tokens.Jwt;

namespace Enlightme.Services;

public class UserService
{
    private readonly Repository<DataContext, User> userRepository;
    private readonly JwtHelper jwtHelper;

    public UserService(Repository<DataContext, User> userRepository, JwtHelper jwtHelper)
    {
        this.userRepository = userRepository;
        this.jwtHelper = jwtHelper;
    }

    public async Task<User> GetUser(string accessToken)
    {
        var token = jwtHelper.Verify(accessToken);

        int userId = int.Parse(token.Claims.FirstOrDefault(c => c.Type == "id").Value);

        var user = await userRepository.GetFirstOrDefault(BaseSpecification<User>.ById(userId));

        return user;
    }

    public async Task<User> GetUserSettings(string accessToken)
    {
        var token = jwtHelper.Verify(accessToken);

        int userId = int.Parse(token.Claims.FirstOrDefault(c => c.Type == "id").Value);

        var user = await userRepository.GetFirstOrDefault(BaseSpecification<User>.ById(userId));

        var userSettingsData = new UserSettingData
        {
            FirstName = user.FirstName,
            LastName = user.LastName,
            ShouldSendNotifications = user.ShouldSendNotifications,
            BirthDate = user.BirthDate
        };

        return user;
    }

    public async Task<User> SetUserSettings(UserSettingData userSettingData)
    {
        var user = await userRepository.GetFirstOrDefault(BaseSpecification<User>.ById(userSettingData.UserId));

        user.FirstName = userSettingData.FirstName;
        user.LastName = userSettingData.LastName;
        user.ShouldSendNotifications = userSettingData.ShouldSendNotifications;
        user.BirthDate = userSettingData.BirthDate;

        if (userSettingData.Image != null)
        {
            byte[]? imageData = null;

            using (var binaryReader = new BinaryReader(userSettingData.Image.OpenReadStream()))
            {
                imageData = binaryReader.ReadBytes((int)userSettingData.Image.Length);
            }

            user.Image = imageData;
        }

        await userRepository.Update(user);

        return user;
    }
}
