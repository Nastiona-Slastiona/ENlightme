using Enlightme.Interfaces;
using Enlightme.Specifications;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Enlightme.Repositories;

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

    public async Task Update(TEntity newEntity)
    {
        TEntity oldentity = await GetFirstOrDefault(new Specification<TEntity>(e => e.Id == newEntity.Id));
        oldentity = newEntity;

        await dataContext.SaveChangesAsync();
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

    protected virtual IQueryable<TEntity> GetSpecifiedQuery(Specification<TEntity>? specification = null, IncludedPropertyCollection<TEntity> includes = null)
    {
        IQueryable<TEntity> query = (IQueryable<TEntity>)GetDbSet();
        Expression<Func<TEntity, bool>> expression = specification?.ToExpression();
        if (expression != null)
        {
            query = query.Where(expression);
        }

        if (includes != null)
        {
            query = includes.Aggregate(query, (current, include) => current.Include(include.AsPath()));
        }

        return query;
    }

    public virtual async Task<int> Count(Specification<TEntity> specification)
    {
        return await GetSpecifiedQuery(specification)
            .CountAsync();
    }

    public async Task<TEntity> GetFirstOrDefault(Specification<TEntity> specification, IncludedPropertyCollection<TEntity> includes = null)
    {
        IQueryable<TEntity> query = GetSpecifiedQuery(specification, includes);

        return await query.FirstOrDefaultAsync();
    }

    public async Task<IReadOnlyList<TEntity>> GetList(Specification<TEntity>? specification = null, IncludedPropertyCollection<TEntity> includes = null)
    {
        IQueryable<TEntity> query = GetSpecifiedQuery(specification, includes);

        return await query.ToListAsync();
    }
}
