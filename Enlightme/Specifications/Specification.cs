using System.Linq.Expressions;

namespace Enlightme.Specifications;


public class Specification<T>
{
    private readonly Expression<Func<T, bool>> expression;

    private Func<T, bool> compiledDelegate;
    private Func<T, bool> CompiledDelegate => compiledDelegate ??= expression.Compile();

    public Specification(Expression<Func<T, bool>> expression)
    {
        this.expression = expression;
    }

    public Expression<Func<T, bool>> ToExpression()
    {
        return expression;
    }

    public bool IsSatisfiedBy(T value)
    {
        return CompiledDelegate(value);
    }
}