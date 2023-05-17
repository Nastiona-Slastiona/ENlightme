using System.ComponentModel.DataAnnotations;

namespace Enlightme.Core.Requests;

public class RefreshRequestInfo
{
    public string RefreshToken { get; set; }
}
