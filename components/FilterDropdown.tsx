import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/Dropdown'
import { capitalizeEachWord } from '@/helpers/helpers'

type FilterDropdownProps = {
    handleFilterSelect: (value: string) => void,
    selectedFilter: string
}

function FilterDropdown({ handleFilterSelect, selectedFilter }: FilterDropdownProps) {
    return (
        <Select onValueChange={handleFilterSelect}>
            <SelectTrigger aria-label="Filter">
                <SelectValue placeholder={capitalizeEachWord(selectedFilter)}>{capitalizeEachWord(selectedFilter)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem key="month" value="MONTH">
                        Month
                    </SelectItem>
                    <SelectItem key="quarter" value="QUARTER">
                        Quarter
                    </SelectItem>
                    <SelectItem key="year" value="YEAR">
                        Year
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default FilterDropdown