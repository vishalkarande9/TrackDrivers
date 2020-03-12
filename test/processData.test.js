const { main } = require('../main');

test('Test valid inputs', () => {
    const expectedOutput = main('./inputFiles/input1.txt');
    const expectedData = [
        'Lauren: 42 miles @ 34 mph',
        'Dan: 39 miles @ 47 mph',
        'Kumi: 0 miles'
      ];
    expect(expectedOutput.data).toEqual(expectedData);
});

test('Test input with no Driver commands', () => {
    const expectedOutput = main('./inputFiles/input2.txt');
    expect(expectedOutput.data).toEqual([]);
});


test('Test input with no Trip commands', () => {
    const expectedOutput = main('./inputFiles/input3.txt');
    const expectedData = [ 'Dan: 0 miles', 'Lauren: 0 miles', 'Kumi: 0 miles' ];
    expect(expectedOutput.data).toEqual(expectedData);
});


test('Test input with invalid Driver and Trip commands', () => {
    const expectedOutput = main('./inputFiles/input4.txt');
    const expectedData = [ 'Dan: 17 miles @ 35 mph', 'Alex: 0 miles', 'Bob: 0 miles' ];
    expect(expectedOutput.data).toEqual(expectedData);
});


test('Test when empty input file is provided', () => {
    const expectedOutput = main('./inputFiles/input5.txt');
    expect(expectedOutput.messageCode).toEqual('inputFileEmpty');
});

test('Test valid trip with low speed (speed < 5 MPH)', () => {
    const expectedOutput = main('./inputFiles/input6.txt');
    const expectedData = [ 'Dan: 0 miles'];
    expect(expectedOutput.data).toEqual(expectedData);
});

test('Test valid trip with High speed (speed > 100 MPH)', () => {
    const expectedOutput = main('./inputFiles/input7.txt');
    const expectedData = [ 'Dan: 0 miles'];
    expect(expectedOutput.data).toEqual(expectedData);
});
