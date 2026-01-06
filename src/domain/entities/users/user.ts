interface User {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    profilePictureUrl: string;
}

export type newUser = Omit<User, 'createdAt' | 'profilePictureUrl'>;
export type loginUser = Pick<User, 'email' | 'password'>;
export type authenticatedUser = Pick<User, 'email' | 'username'> & {
    id: string
}