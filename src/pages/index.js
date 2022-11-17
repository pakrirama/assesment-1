import React from "react";
import { Space, PageHeader, Select, Spin } from "antd";
import axios from "axios";

import { UserCard } from "../component/UserCard";
import { useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroller";
import { filterNat } from "../lib/constants/nat";

export default function Home() {
  const [usersData, setUsersData] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [nat, setNat] = useState();

  const fetchUsers = async (page) => {
    try {
      const res = await axios.get(`https://randomuser.me/api`, {
        params: { page, results: 12, nat },
      });
      const data = res.data.results;

      if (page == 1) {
        setUsersData(data);
      } else {
        setUsersData([...usersData, ...data]);
      }

      if (res.data.length === 0) {
        setHasMoreItems(false);
      } else {
        setHasMoreItems(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (value) => {
    setNat(value);
  };

  useEffect(() => {
    fetchUsers(1);
  }, [nat]);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <PageHeader
        className="shadow"
        ghost={false}
        title="List Users"
        style={{
          position: "sticky",
          zIndex: 2,
          top: "0%",
          marginBottom: "20px",
        }}
        extra={
          <Select
            showSearch
            allowClear
            placeholder="Select Country"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={filterNat}
            style={{ width: 200 }}
          />
        }
      ></PageHeader>

      {/* Content */}
      <InfiniteScroll
        threshold={0}
        pageStart={0}
        loadMore={fetchUsers}
        hasMore={hasMoreItems}
        loader={
          usersData.length !== 0 && (
            <Spin
              size="default"
              style={{
                left: "50%",
                bottom: "0%",
                position: "relative",
                marginBlock: "15px",
              }}
              key={1}
            />
          )
        }
      >
        <Space size={[8, 16]} wrap style={{ justifyContent: "center" }}>
          {usersData && usersData.length !== 0 ? (
            usersData.map((val, idx) => {
              return <UserCard data={val} key={idx} />;
            })
          ) : (
            <Spin
              size="large"
              style={{ left: "50%", top: "50%", position: "absolute" }}
            />
          )}
        </Space>
      </InfiniteScroll>
    </div>
  );
}
