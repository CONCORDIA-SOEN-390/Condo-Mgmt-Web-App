import LockerTable from './LockerTable';

const PropertyDetail = ({ propertyId }) => {
    return (
        <div>
            <h2>Property ID: {propertyId}</h2>
            <LockerTable propertyId={propertyId} />
        </div>
    );
};

export default PropertyDetail;
