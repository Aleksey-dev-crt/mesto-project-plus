import { model, Model, Schema, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface UserModel extends Model<IUser> {
  findUserByCredentials: (
    email: string,
    password: string,
  ) => Promise<Document<unknown, any, IUser>>;
}

const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (v: string) => /\b(https?|ftp|file):\/\/[\-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[\-A-Za-z0-9+&@#\/%=~_|]/.test(v),
      message: 'Invalid url.',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    unique: true,
    index: true,
    required: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: 'Invalid e-mail.',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.static(
  'findUserByCredentials',
  function findUserByCredentials(email: string, password: string) {
    return this.findOne({ email })
      .select('+password')
      .then((user) => {
        if (!user) {
          return Promise.reject(new Error('Wrong email or password.'));
        }

        return bcrypt.compare(password, user.password).then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Wrong email or password.'));
          }

          return user;
        });
      });
  },
);

export default model<IUser, UserModel>('user', userSchema);
