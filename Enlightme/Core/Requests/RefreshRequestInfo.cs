using System.ComponentModel.DataAnnotations;

namespace Enlightme.Core.Requests;

public class RefreshRequestInfo
{
    [Required]
    public string RefreshToken { get; set; }
}
