import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, CircularProgress } from '@mui/material';
import { useSession } from 'next-auth/react';
import { SelectChangeEvent } from '@mui/material/Select'; // Import SelectChangeEvent
import createCampground from '@/libs/createCampground'; // Import the API call function

// Region options for dropdown
const regions = ["North", "South", "East", "West", "Central", "North East"];

const CreateCampgroundForm: React.FC = () => {
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        district: '',
        province: '',
        postalcode: '',
        tel: '',
        region: '',
    });

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;

        if (name) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleRegionChange = (e: SelectChangeEvent<string>) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            region: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session?.user.token) {
            setError('You must be logged in to create a campground');
            return;
        }

        if (!formData.name || !formData.address || !formData.district || !formData.province || !formData.postalcode || !formData.tel || !formData.region) {
            setError('All fields are required');
            return;
        }

        if (formData.postalcode.length < 1 || formData.postalcode.length > 5) {
            setError('Postal code must be between 1 and 5 digits');
            return;
        }

        if (formData.tel.length !== 9) {
            setError('Telephone number must be exactly 9 digits');
            return;
        }

        setSubmitting(true);
        setError('');
        setSuccess('');

        try {
            await createCampground(formData, session.user.token);
            setSuccess('Campground created successfully!');
            setFormData({
                name: '',
                address: '',
                district: '',
                province: '',
                postalcode: '',
                tel: '',
                region: '',
            });
        } catch (error) {
            setError('Failed to create campground. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Create New Campground</h2>

            {error && <div className="text-red-600 mb-4">{error}</div>}
            {success && <div className="text-green-600 mb-4">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    fullWidth
                    label="Campground Name"
                    name="name"
                    value={formData.name}
                    onChange={handleTextFieldChange}
                    required
                />
                <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleTextFieldChange}
                    required
                />
                <TextField
                    fullWidth
                    label="District"
                    name="district"
                    value={formData.district}
                    onChange={handleTextFieldChange}
                    required
                />
                <TextField
                    fullWidth
                    label="Province"
                    name="province"
                    value={formData.province}
                    onChange={handleTextFieldChange}
                    required
                />

                <TextField
                    fullWidth
                    label="Postal Code"
                    name="postalcode"
                    value={formData.postalcode}
                    onChange={handleTextFieldChange}
                    required
                    inputProps={{
                        maxLength: 5,
                        style: {
                            MozAppearance: 'textfield',
                            appearance: 'textfield',
                        }
                    }}
                    type="number"
                />
                
                <TextField
                    fullWidth
                    label="Telephone"
                    name="tel"
                    value={formData.tel}
                    onChange={handleTextFieldChange}
                    required
                    inputProps={{ maxLength: 9 }}
                    type="tel"
                />

                <FormControl fullWidth required>
                    <InputLabel>Region</InputLabel>
                    <Select
                        name="region"
                        value={formData.region}
                        onChange={handleRegionChange} // Use handleRegionChange for Select
                        label="Region"
                    >
                        {regions.map((region) => (
                            <MenuItem key={region} value={region}>
                                {region}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                    disabled={submitting}
                    className="mt-4"
                >
                    {submitting ? <CircularProgress size={24} color="inherit" /> : 'Create Campground'}
                </Button>
            </form>
        </div>
    );
};

export default CreateCampgroundForm;
