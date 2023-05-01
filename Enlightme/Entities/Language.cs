using System.ComponentModel.DataAnnotations;

namespace Enlightme.Entities;

public class Language
{
    [Key]
    public int Id { get; set; }
    public string LanguageName { get; set; }
    public string Abbreviation { get; set; }
}
