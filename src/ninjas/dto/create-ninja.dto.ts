import { IsEnum, IsString, Length, MinLength } from 'class-validator';

enum Weapon {
  Stars = 'stars',
  Nunchucks = 'nunchucks',
}

export class CreateNinjaDto {
  @IsString()
  @Length(3, 10, { groups: ['create'] })
  @Length(5, 10, { groups: ['update'] })
  name: string;

  @IsEnum(['stars', 'nunchucks'], {
    message: 'Please choose a correct weapon (stars or nunchucks)',
  })
  weapon: 'stars' | 'nunchucks';
}
