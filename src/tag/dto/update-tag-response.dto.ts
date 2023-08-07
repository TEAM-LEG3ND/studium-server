import { UpdateTagDto } from './update-tag.dto';

export class UpdateTagResponseDto extends UpdateTagDto {
  // You can add additional properties specific to the response, if needed.
  // For example, a message or status code, but they are optional.

  // constructor is optional if the superclass already has one that sets the properties
  constructor(partial: Partial<UpdateTagDto>) {
    super();
    Object.assign(this, partial);
  }
}
