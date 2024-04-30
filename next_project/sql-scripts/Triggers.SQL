-- Create a function to update condo_fee
CREATE OR REPLACE FUNCTION update_condo_fee()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate new condo_fee based on square_footage and price_per_square_foot
    NEW.condo_fee := NEW.square_footage * NEW.price_per_square_foot;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER condo_fee_update_trigger
BEFORE UPDATE OF square_footage, price_per_square_foot
ON unit
FOR EACH ROW
EXECUTE FUNCTION update_condo_fee();

 --
 --
 --
 --

--Record sale of property
CREATE OR REPLACE FUNCTION record_sale()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the property type is 'sale'
    IF EXISTS (SELECT 1 FROM property WHERE property_id = OLD.property_id AND property_type = 'sale') THEN
        -- Insert old values into the sale table
        INSERT INTO sale (property_id, old_owner_id, condo_fee)
        VALUES (OLD.property_id, OLD.owner_id, OLD.condo_fee);
    END IF;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER unit_owner_update_trigger
AFTER UPDATE OF owner_id ON unit
FOR EACH ROW
WHEN (OLD.owner_id IS DISTINCT FROM NEW.owner_id)
EXECUTE FUNCTION record_sale();

--
--
--

--Record status update
CREATE OR REPLACE FUNCTION record_request_update()
RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO req_update (req_id, update_new_status) VALUES (NEW.req_id, NEW.status_id);
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER request_update_trigger
AFTER UPDATE ON request
FOR EACH ROW
EXECUTE FUNCTION record_request_update();

