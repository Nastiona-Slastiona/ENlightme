namespace Enlightme.Dtos;

public class GenreData
{
    public GenreData(int id, string type)
    {
        Id = id;
        Type = type;
    }

    public int Id { get; set; }
    public string Type { get; set; }
}
