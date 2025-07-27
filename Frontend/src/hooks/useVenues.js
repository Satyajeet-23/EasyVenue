import { useQuery } from '@tanstack/react-query';
import { getAllVenues } from '../services/venueService';

export const useVenues = () => {
    return useQuery(['venues'], getAllVenues);
};
