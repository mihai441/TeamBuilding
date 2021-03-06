using DotNetCore.Domain;

namespace Architecture.Domain;

public class User : Entity<long>
{
    public User
    (
        Name name,
        Email email,
        Auth auth
    )
    {
        Name = name;
        Email = email;
        Auth = auth;
        Activate();
    }

    public User(long id) => Id = id;

    public Name Name { get; private set; }

    public Email Email { get; private set; }

    public Status Status { get; private set; }

    public Auth Auth { get; private set; }

    public string AvatarGuid { get; set; }


    public void Activate()
    {
        Status = Status.Active;
    }

    public void Inactivate()
    {
        Status = Status.Inactive;
    }

    public void Update(string avatarGuid)
    {
        AvatarGuid = avatarGuid;
    }
}
