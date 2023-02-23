import {formatNumber} from './formatters';

describe('formatNumber', () => {
  it('should show the number as is if it is less than 10,000', () => {
    expect(formatNumber(1000)).toEqual(1000);
    expect(formatNumber(9999)).toEqual(9999);
  });

  it('should format correctly with a minimum of 1 decimal place with the K ending for numbers 10,000 to 999,949', () => {
    expect(formatNumber(10000)).toEqual('10.0K');
    expect(formatNumber(999949)).toEqual('999.9K');
  });
  it('should format correctly with a minimum of 1 decimal place with the M ending for numbers 999,950 to 999,949,999', () => {
    expect(formatNumber(999950)).toEqual('1.0M');
    expect(formatNumber(1000000)).toEqual('1.0M');
    expect(formatNumber(999949999)).toEqual('999.9M');
  });
  it('should format numbers for billions correctly from the range 999,950,000 to 999,949,999,999', () => {
    expect(formatNumber(999950000)).toEqual('1.0B');
    expect(formatNumber(999949999999)).toEqual('999.9B');
  });
  it('should format numbers for trillions correctly for numbers 999,950,000,000 (999.95 million) and larger', () => {
    expect(formatNumber(999950999999)).toEqual('1.0T');
    expect(formatNumber(999900000000000)).toEqual('999.9T');
  });
});
