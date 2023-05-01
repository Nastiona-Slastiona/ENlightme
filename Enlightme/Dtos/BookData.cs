using Enlightme.Entities;

namespace Enlightme.Dtos;

public class BookData
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Author { get; set; }
    public int Genre { get; set; }
    public int Language { get; set; }

    public IFormFile? Cover { get; set; }
    public IFormFile Book { get; set; }
}
