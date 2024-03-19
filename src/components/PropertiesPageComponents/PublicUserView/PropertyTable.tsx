const properties = [
  {
    address: "1111 one Street",
    apartment: 604,
    dimension: 1100,
    parking: "S201",
    locker: 238,
    owner: "John Doe",
    occupant: "John Doe" // John owns and occupies this condo
  },
  {
    address: "2222 two Avenue",
    apartment: 305,
    dimension: 950,
    parking: "S202",
    locker: 182,
    owner: "John Doe",
    occupant: "" // John owns, but condo is vacant
  },
  {
    address: "3333 three Blvd",
    apartment: 708,
    dimension: 1200,
    parking: "S203",
    locker: 215,
    owner: "Lucy Lane",
    occupant: "John Doe" // John occupies this condo but does not own it
  },
  {
    address: "4444 four Drive",
    apartment: 102,
    dimension: 800,
    parking: "S204",
    locker: 190,
    owner: "John Doe",
    occupant: "Annie Doe" // John owns this condo, but someone else occupies it
  },
  {
    address: "5555 five Lane",
    apartment: 501,
    dimension: 1050,
    parking: "S205",
    locker: 207,
    owner: "John Doe",
    occupant: "ALex Doe" 
  }
];


export default function PropertyTable() {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-500 text-white">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Appartment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Dimension (sqft)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Parking</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Locker</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Owner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Occupant</th>
                </tr>
            </thead>
            <tbody>
                {properties.map((property, id) => {
                    return (
                        <tr key={id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{id + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.address}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.apartment}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.dimension}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.parking}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.locker}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.owner}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.occupant}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}