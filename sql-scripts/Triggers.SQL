-- Create a function to update condo_fee
CREATE OR REPLACE FUNCTION update_condo_fee()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate new condo_fee based on square_footage and price_per_square_foot
    NEW.condo_fee := NEW.square_footage * NEW.price_per_square_foot;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function on UPDATE of square_footage or price_per_square_foot
CREATE TRIGGER condo_fee_update_trigger
BEFORE UPDATE OF square_footage, price_per_square_foot
ON unit
FOR EACH ROW
EXECUTE FUNCTION update_condo_fee();
