import {
  IsIn,
  IsLatLong,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class PublisherInventoryDto {
  @IsString()
  @IsNotEmpty()
  inventoryName: string;

  @IsIn([
    'billboard',
    'construction advert',
    'lamp post',
    'street furniture',
    'transit advert',
  ])
  inventoryCategory: string;

  @IsIn(['digital', 'static'])
  inventoryClass: string;

  @IsString()
  @IsNotEmpty()
  inventoryType: string;

  @IsNumber()
  inventoryHeightPixel: number;

  @IsNumber()
  inventoryHeightMetre: number;

  @IsNumber()
  inventoryWidthPixel: number;

  @IsNumber()
  inventoryWidthMetre: number;

  @IsString()
  @IsNotEmpty()
  inventoryLocation: string;

  @IsIn(['active', 'inactive', 'vacant'])
  inventoryStatus: string;

  @IsIn([
    'northcentral',
    'northeast',
    'northwest',
    'southeast',
    'southsouth',
    'southwest',
  ])
  inventoryRegion: string;

  @IsString()
  @IsNotEmpty()
  inventoryState: string;

  @IsString()
  @IsNotEmpty()
  inventoryLga: string;

  @IsString()
  @IsNotEmpty()
  inventoryCity: string;

  @IsLatLong()
  inventoryCoordinate: string;

  @IsNumber()
  inventoryAmountAnnum: number;

  @IsNumber()
  inventorySlot: number;

  @IsNumber()
  inventoryFace: number;

  @IsNumber()
  inventoryUnit: number;

  @IsUrl()
  inventoryImage: string;
}
