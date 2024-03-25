

const documents = [
    {
      "type": "Proof of Ownership",
      "title": "Title Deed for Unit 101",
      "uploadDate": "2023-01-15",
      "uploadedBy": "John Doe",
      "status": "Verified"
    },
    {
      "type": "Personal Identification",
      "title": "Passport",
      "uploadDate": "2023-02-20",
      "uploadedBy": "Jane Doe",
      "status": "Pending Verification"
    },
    {
      "type": "Financial Documents",
      "title": "Property Tax Receipt 2022",
      "uploadDate": "2023-03-05",
      "uploadedBy": "John Doe",
      "status": "Verified"
    },
    {
      "type": "Insurance Policy",
      "title": "Intact Homeowner's Insurance Policy",
      "uploadDate": "2023-04-10",
      "uploadedBy": "Jane Doe",
      "status": "Verified"
    },
    {
      "type": "Renovation Permissions and Documents",
      "title": "Kitchen Renovation Approval",
      "uploadDate": "2023-05-12",
      "uploadedBy": "John Doe",
      "status": "Approved"
    }
  ];
  
export default function DocumentTable() {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-blue-500 text-white">
        <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Document Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date Uploaded</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Uploaded by</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
        </tr>
      </thead>
      <tbody>
          {documents.map((document, id) => {
            return (
              <tr key={id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.uploadDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.uploadedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.status}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}