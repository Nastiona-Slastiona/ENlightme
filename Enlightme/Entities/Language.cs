using Enlightme.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Enlightme.Entities;

public class Language : IHasId
{
    [Key]
    public int Id { get; set; }
    public string LanguageName { get; set; }
    public string Abbreviation { get; set; }
}
