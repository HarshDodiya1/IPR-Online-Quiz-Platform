import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';


const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div>DashSidebar</div>
  )
}

export default DashSidebar