namespace Enlightme.Dtos;

public class UserSettingData
{
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool ShouldSendNotifications { get; set; }
    public DateTime BirthDate { get; set; }
    public IFormFile? Image { get; set; }
}
