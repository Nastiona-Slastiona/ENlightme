using Enlightme.Models;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Enlightme.Entities;

namespace Enlightme.Helpers
{
    public class JwtHelper
    {
        private readonly AuthenticationConfiguration authenticationConfiguration;

        public JwtHelper(IOptions<AuthenticationConfiguration> options)
        {
            this.authenticationConfiguration = options.Value;
        }

        public string GenerateAccessToken(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim("id", user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.FirstName)
            };

            var token = Generate(
                authenticationConfiguration.AccessTokenSecret,
                authenticationConfiguration.Issuer,
                authenticationConfiguration.Audience,
                authenticationConfiguration.AccessTokenExpirationMinutes,
                claims);

            return token;
        }

        public string GenerateRefreshToken()
        {
            var token = Generate(
                authenticationConfiguration.RefreshTokenSecret,
                authenticationConfiguration.Issuer,
                authenticationConfiguration.Audience,
                authenticationConfiguration.RefreshTokenExpirationMinutes);

            return token;
        }

        public bool Validate(string refreshToken)
        {
            try
            {
                Verify(refreshToken, true);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public JwtSecurityToken Verify(string jwt, bool isRefreshToken = false)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = isRefreshToken ? authenticationConfiguration.RefreshTokenSecret : authenticationConfiguration.AccessTokenSecret;

            tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
                ValidIssuer = authenticationConfiguration.Issuer,
                ValidAudience = authenticationConfiguration.Audience,
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken securityToken);

            return (JwtSecurityToken)securityToken;
        }

        private string Generate(
            string secretKey,
            string issuer,
            string audience,
            double expirationMinutes,
            IEnumerable<Claim>? claims = null)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credentials);

            var payload = new JwtPayload(issuer, audience, claims, DateTime.UtcNow, DateTime.UtcNow.AddMinutes(expirationMinutes));
            var securityToken = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
    }
}
