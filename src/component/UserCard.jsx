import { Avatar, Card, Modal } from "antd";
import { MailTwoTone, HomeTwoTone, FlagTwoTone } from "@ant-design/icons";
import PropTypes from "prop-types";

import moment from "moment/moment";

import React, { useState } from "react";
import { BiCake, BiUser, BiBody, BiMobile, BiMap } from "react-icons/bi";
import { BsGenderAmbiguous } from "react-icons/bs";

export const UserCard = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Card
        title={
          <>
            <Avatar src={data.picture.medium} />
            {` ${data.name.title}. ${data.name.first} ${data.name.last}`}
          </>
        }
        hoverable
        style={{
          width: 330,
        }}
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="fadeIn"
      >
        <p>
          <MailTwoTone />
          {` ${data.email}`}
        </p>
        <p>
          <HomeTwoTone /> {` ${data.location.city}`}
        </p>
        <p>
          <FlagTwoTone />
          {` ${data.location.country}`}
        </p>
        <p>
          <BiCake color="#1890ff" />
          {`  ${moment(data.dob.date).format("MMM Do YYYY")}`}
        </p>
      </Card>
      <Modal
        title={
          <>
            <Avatar src={data.picture.medium} />
            {` ${data.name.title}. ${data.name.first} ${data.name.last}`}
          </>
        }
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <p>
          <BiUser color="#1890ff" />
          {`  ${data.name.first} ${data.name.last}`}
        </p>
        <p>
          <BsGenderAmbiguous color="#1890ff" />
          {`  ${data.gender}`}
        </p>
        <p>
          <MailTwoTone />
          {` ${data.email}`}
        </p>
        <p>
          <BiMobile color="#1890ff" />
          {` ${data.phone}`}
        </p>
        <p>
          <HomeTwoTone /> {` ${data.location.city}`}
        </p>
        <p>
          <FlagTwoTone />
          {` ${data.location.country}`}
        </p>
        <p>
          <BiCake color="#1890ff" />
          {`  ${moment(data.dob.date).format("MMM Do YYYY")}`}
        </p>
        <p>
          <BiBody color="#1890ff" />
          {`  ${moment().diff(data.dob.date, "years")}`}
        </p>
        <p>
          <BiMap color="#1890ff" />
          {` ${data.location.street.name} ${data.location.street.number}, ${data.location.city} ${data.location.state}, ${data.location.country} (${data.location.postcode}) `}
        </p>
      </Modal>
    </div>
  );
};

UserCard.propTypes = {
  data: PropTypes.object.isRequired,
};
