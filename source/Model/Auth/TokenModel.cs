using Architecture.Domain;

namespace Architecture.Model;

public sealed record TokenModel(string Token, string Email, int Role, UserModel user);
