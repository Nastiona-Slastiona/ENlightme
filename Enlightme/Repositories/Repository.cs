using Enlightme.Interfaces;
using Enlightme.Specifications;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Enlightme.Repositories
{
    public class Repository<TContext, TEntity>
        where TContext : DbContext
        where TEntity : class, IHasId
    {
        private readonly TContext dataContext;
        protected readonly DbSet<TEntity> DbSet;

        public Repository(TContext dataContext)
        {
            this.dataContext = dataContext;
            DbSet = dataContext.Set<TEntity>();
        }

        public async Task<TEntity> Create(TEntity entity)
        {
            await dataContext.AddAsync<TEntity>(entity);
            await dataContext.SaveChangesAsync();

            return entity;
        }

        public async Task Delete(TEntity entity)
        {
            dataContext.Remove(entity);
            await dataContext.SaveChangesAsync();
        }

        public async Task Delete(Specification<TEntity> specification)
        {
            await DbSet.Where(specification.ToExpression()).ExecuteDeleteAsync();

            await dataContext.SaveChangesAsync();
        }

        protected virtual IQueryable<TEntity> GetDbSet()
        {
            return DbSet;
        }

        public async Task<TEntity> GetFirstOrDefault<TEntity>(Specification<TEntity> specification)
        {
            IQueryable<TEntity> query = (IQueryable<TEntity>)GetDbSet();
            Expression<Func<TEntity, bool>> expression = specification?.ToExpression();
            if (expression != null)
            {
                query= query.Where(expression);
            }

            return await query.FirstOrDefaultAsync();
        }
    }
}
