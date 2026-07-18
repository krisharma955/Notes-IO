import React from 'react'

/**
 * FilterTabs
 *
 * Props:
 *   activeTab   — 'all' | 'pinned' | 'archived'
 *   onTabChange — callback(tabId: string)
 */
const FilterTabs = ({ activeTab = 'all', onTabChange }) => {

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'pinned', label: 'Pinned' },
    { id: 'archived', label: 'Archived' },
  ]

  return (
    <div className='flex gap-2 px-5 md:px-10 mb-6 overflow-x-auto no-scrollbar'>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange && onTabChange(tab.id)}
          className={`text-base md:text-[18px] px-4 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap ${
            activeTab === tab.id
              ? 'bg-emerald-950 text-emerald-400'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default FilterTabs