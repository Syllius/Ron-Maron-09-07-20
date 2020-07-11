interface Task {
    _id?: string;
    user: User;
    content: string;
    date: Date;
    complete: boolean;
}

interface User {
    _id?: string;
    username: string;
    password?: string;
    phone: string;
    email: string;
    userType: number;
}