namespace Enlightme.Entities;

public class UserSettings
{
    public int UserId { get; set; }
    public byte[] Photo { get; set; }
    public bool IsDarkThemeMode { get; set; }
    public int LanguageId { get; set; }
    public int SendNotification { get; set; }
}

