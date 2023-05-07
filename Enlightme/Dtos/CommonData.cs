using Enlightme.Entities;

namespace Enlightme.Dtos;

public class CommonData
{
    public IReadOnlyList<Genre> Genres { get; set; }
    public IReadOnlyList<Language> Languages { get; set; }

    public CommonData(IReadOnlyList<Genre> genres, IReadOnlyList<Language> languages) { 
        this.Genres = genres;
        this.Languages = languages;
    }
}
