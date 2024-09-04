export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  return IDL.Service({
    'getOrderBook' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Float64, IDL.Float64, IDL.Float64))],
        ['query'],
      ),
    'getPriceData' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(Time, IDL.Float64))],
        ['query'],
      ),
    'placeMockOrder' : IDL.Func([IDL.Float64, IDL.Float64, IDL.Bool], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
