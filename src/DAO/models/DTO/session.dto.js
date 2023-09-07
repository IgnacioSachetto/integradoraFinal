export class DTOsession {
    constructor(user) {
        this.fullname= user.firstName+", "+user.lastName
        this.email = user.email || '';
        this.user = user.rol || '';
    }
}