

export class User {
    declare gapi : any;
    Id:string;
    Email:string;

    static fromBasicProfile(profile: gapi.auth2.BasicProfile): User {
        let user:User = new User();
        user.Id = profile.getId();
        user.Email = profile.getEmail();
        return user;
    }
}