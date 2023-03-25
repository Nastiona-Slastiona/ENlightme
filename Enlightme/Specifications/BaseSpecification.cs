using Enlightme.Entities;

namespace Enlightme.Specifications
{
    public static class BaseSpecification
    {
        public static Specification<User> ByEmail(string email)
        {
            return new(x => x.Email == email);
        }

        public static Specification<User> ById(int id)
        {
            return new(x => x.Id == id);
        }
    }
}
