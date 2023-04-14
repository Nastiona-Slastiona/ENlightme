namespace Enlightme.Dtos
{
    public class UserRegisterData
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public IFormFile Image { get; set; }
        public string Password { get; set; }
    }
}
