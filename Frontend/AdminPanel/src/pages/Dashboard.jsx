import React, { useEffect, useRef } from 'react';
import { 
  FileText, 
  Folder, 
  Package, 
  Users, 
  MessageCircle, 
  Eye, 
  Mail, 
  Briefcase,
  TrendingUp,
  Calendar
} from 'lucide-react';
import PageHeader from '../components/PageHeader'
import { useDashboardQuery } from '../api/auth.api';
import { Link } from 'react-router-dom';

// ApexCharts component
const ApexChart = ({ options, series, type, height }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ApexCharts && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      const config = {
        ...options,
        series: series,
        chart: {
          ...options.chart,
          type: type,
          height: height,
          toolbar: { show: false },
          background: 'transparent'
        }
      };
      
      chartInstance.current = new window.ApexCharts(chartRef.current, config);
      chartInstance.current.render();
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [options, series, type, height]);

  return <div ref={chartRef} />;
};

const Dashboard = () => {
  const [loaded, setLoaded] = React.useState(false);
  const { data, isLoading, isError } = useDashboardQuery();
  console.log(data);

  // Load ApexCharts script
  useEffect(() => {
    if (!window.ApexCharts) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.35.5/apexcharts.min.js";
      script.async = true;
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Error loading dashboard data. Please try again.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!loaded) return <p className="text-center mt-10">Loading charts...</p>;

  const counts = data?.data?.counts || {};
  
  const stats = [
    { title: 'Blogs', count: counts.blogs || 0, icon: FileText, color: 'bg-blue-500', border: 'border-b-blue-500', field: 'blogs' },
    { title: 'Project Gallery', count: counts.projects || 0, icon: Folder, color: 'bg-purple-500', border: 'border-b-purple-500', field: 'projects' },
    { title: 'Products', count: counts.products || 0, icon: Package, color: 'bg-green-500', border: 'border-b-green-500', field: 'products' },
    { title: 'Our Team', count: counts.teams || 0, icon: Users, color: 'bg-orange-500', border: 'border-b-orange-500', field: 'teams' },
    { title: 'Inquiries', count: counts.inquiries || 0, icon: MessageCircle, color: 'bg-red-500', border: 'border-b-red-500', field: 'inquiries' },
    { title: 'Website Visitors', count: counts.visitors || 0, icon: Eye, color: 'bg-indigo-500', border: 'border-b-indigo-500',field: 'visitors' },
    { title: 'Newsletter Subscribers', count: counts.subscribers || 0, icon: Mail, color: 'bg-pink-500', border: 'border-b-pink-500', field: 'subscribers' },
    { title: 'Job Applications', count: counts.jobs || 0, icon: Briefcase, color: 'bg-teal-500', border: 'border-b-teal-500', field: 'jobs' }
  ];

  const formatNumber = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Process visitor data for chart
  const processVisitorData = () => {
    const visitorsByMonth = data?.data?.visitorsByMonth || [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthData = new Array(12).fill(0);
    
    visitorsByMonth.forEach(item => {
      const monthIndex = item._id.month - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        monthData[monthIndex] = item.count;
      }
    });
    
    return monthData;
  };

  // Process subscriber data for chart
  const processSubscriberData = () => {
    const subscribersByMonth = data?.data?.subscribersByMonth || [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthData = new Array(12).fill(0);
    
    subscribersByMonth.forEach(item => {
      const monthIndex = item._id.month - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        monthData[monthIndex] = item.count;
      }
    });
    
    return monthData;
  };

  const visitorsData = processVisitorData();
  const subscribersData = processSubscriberData();

  // Website Visitors Chart Options
  const visitorsChartOptions = {
    chart: {
      type: 'area',
      sparkline: false,
      fontFamily: 'Inter, sans-serif',
      foreColor: '#6B7280'
    },
    colors: ['#3B82F6'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 3,
      xaxis: {
        lines: { show: false }
      },
      yaxis: {
        lines: { show: true }
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          fontSize: '11px',
          fontWeight: 500
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '11px'
        },
        formatter: (value) => formatNumber(value)
      }
    },
    tooltip: {
      theme: 'light',
      x: {
        format: 'MMM'
      },
      y: {
        formatter: (value) => formatNumber(value) + ' visitors'
      }
    },
    markers: {
      size: 0,
      hover: {
        size: 6
      }
    }
  };

  const visitorsChartSeries = [{
    name: 'Visitors',
    data: visitorsData
  }];

  // Newsletter Subscribers Chart Options
  const subscribersChartOptions = {
    chart: {
      type: 'line',
      sparkline: false,
      fontFamily: 'Inter, sans-serif',
      foreColor: '#6B7280'
    },
    colors: ['#EC4899'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 3,
      xaxis: {
        lines: { show: false }
      },
      yaxis: {
        lines: { show: true }
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          fontSize: '11px',
          fontWeight: 500
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '11px'
        },
        formatter: (value) => value.toString()
      }
    },
    tooltip: {
      theme: 'light',
      x: {
        format: 'MMM'
      },
      y: {
        formatter: (value) => value + ' new subscribers'
      }
    },
    markers: {
      size: 4,
      colors: ['#EC4899'],
      strokeColors: '#FFFFFF',
      strokeWidth: 2,
      hover: {
        size: 6
      }
    }
  };

  const subscribersChartSeries = [{
    name: 'New Subscribers',
    data: subscribersData
  }];

  // Calculate total visitors and subscribers for the year
  const totalVisitors = visitorsData.reduce((sum, count) => sum + count, 0);
  const totalSubscribers = subscribersData.reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <PageHeader title="Dashboard Overview"/>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`bg-white  rounded-lg p-4 shadow-sm border border-gray-100 border-b-4 ${stat?.border} hover:shadow-md transition-shadow`}>
                <div className="flex items-center justify-between mb-2">
                  <div className={`${stat?.color} p-2 rounded-lg`}>
                  {/* <div className={`bg-black p-2 rounded-lg`}> */}
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  {stat.count > 0 && (
                    <span className="text-xs text-green-600 font-medium">Active</span>
                  )}
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{formatNumber(stat.count)}</p>
                  <p className="text-sm text-gray-800 truncate">{stat.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Website Visitors Chart */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-500 p-2 rounded-lg">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800">Website Visitors</h3>
                  <p className="text-xs text-gray-600">Monthly traffic overview</p>
                </div>
              </div>
              {totalVisitors > 0 && (
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-xs font-medium">Active</span>
                </div>
              )}
            </div>
            <ApexChart 
              type="area"
              height={200}
              series={visitorsChartSeries}
              options={visitorsChartOptions}
            />
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Total this year: {formatNumber(totalVisitors)} visitors</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Last updated: Today</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Subscribers Chart */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-pink-500 p-2 rounded-lg">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800">Newsletter Subscribers</h3>
                  <p className="text-xs text-gray-600">Monthly subscription growth</p>
                </div>
              </div>
              {totalSubscribers > 0 && (
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-xs font-medium">Growing</span>
                </div>
              )}
            </div>
            <ApexChart 
              type="line"
              height={200}
              series={subscribersChartSeries}
              options={subscribersChartOptions}
            />
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Total subscribers: {formatNumber(counts.subscribers || 0)}</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Growth this year: {formatNumber(totalSubscribers)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Link to="/blog/add" className="flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <FileText className="w-4 h-4" />
              <span>New Blog</span>
            </Link>
            <Link to="/product/add" className="flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Package className="w-4 h-4" />
              <span>Add Product</span>
            </Link>
            <Link to="/team/add" className="flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Users className="w-4 h-4" />
              <span>Team Member</span>
            </Link>
            <Link to="/gallery/add" className="flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Mail className="w-4 h-4" />
              <span>Add Project Gallery</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;