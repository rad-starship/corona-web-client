export class User {
    public id: string;
    public firstName: string;
    public lastName: string;
    public userName: string;
    public password: string;
    public email: string;    
    public roleId: string;    
    public tenantIds: string[];    

    constructor(id: string, firstName: string, lastName: string, userName: string, password: string, email: string, roleId: string, tenantIds: string[]) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.roleId = roleId;
        this.tenantIds = tenantIds;
    }
}
