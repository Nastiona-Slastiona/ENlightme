using Enlightme.Dtos;
using Enlightme.Entities;

namespace Enlightme.Helpers;

public class FileHelper
{
    public FileHelper()
    { }

    public byte[] GetFileBytes(IFormFile file)
    {
        byte[]? fileData = null;

        using (var binaryReader = new BinaryReader(file.OpenReadStream()))
        {
            fileData = binaryReader.ReadBytes((int)file.Length);
        }

        return fileData;
    }
}
