import { Avatar } from "baseui/avatar";
import { Block } from "baseui/block";
import { PLACEMENT, StatefulTooltip } from "baseui/tooltip";
import {
  ParagraphLarge,
  ParagraphSmall,
  ParagraphXSmall,
} from "baseui/typography";
import EmptyState from "components/EmptyState";
import { AVATAR_OVERRIDE } from "components/Overrides/Avatar";
import { TOOLTIP_OVERRIDE } from "components/Overrides/Tooltip";
import LangContext from "context/LangContext";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Col, Row } from "react-simple-flex-grid";

import { TableContainer, TableStyles, Td, Th, Tr } from "./styles";

const handleDate = (timestamp, lang) => {
  const unixTime = timestamp;
  const date = new Date(unixTime * 1000);

  const cleanDate = moment(date, "YYYYMMDD")
    .locale(lang === "es-ES" ? "es" : "us")
    .fromNow();

  return cleanDate;
};

const renderNotificationList = (
  data,
  outline,
  notificationTitle,
  notificationDesc,
  width,
  lang
) => {
  return data === undefined || data.length === 0 ? (
    <EmptyState
      desc={notificationDesc}
      global={false}
      renderMeta={false}
      title={notificationTitle}
    />
  ) : (
    data.map((item, trIndex) => (
      <Tr $outline={outline} key={`tr-${trIndex * 1}`}>
        <Td $outline={outline} key={trIndex}>
          <Row
            style={{
              width: "100%",
              padding: "1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {width <= 569 ? null : (
              <Col
                lg={1}
                md={1}
                sm={1}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
                xl={1}
                xs={2}
              >
                <Avatar
                  name={"Kanye West"}
                  overrides={AVATAR_OVERRIDE}
                  size="scale1400"
                />
              </Col>
            )}
            <Col
              lg={8}
              md={8}
              sm={8}
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
              xl={8}
              xs={width <= 569 ? 12 : 10}
            >
              <div style={{ paddingLeft: "1rem" }}>
                <ParagraphLarge className="no-margin" color="secondaryDark">
                  {item.notification?.title}
                </ParagraphLarge>
                <div style={{ marginTop: ".25rem" }}>
                  <ParagraphSmall className="no-margin" color="secondaryDark">
                    {item.notification?.content}
                  </ParagraphSmall>
                </div>
                {width <= 767 ? (
                  <div style={{ marginTop: ".25rem" }}>
                    <ParagraphXSmall
                      className="no-margin"
                      color="secondaryDark"
                    >
                      {handleDate(item.notification?.modified, lang)}
                    </ParagraphXSmall>
                  </div>
                ) : undefined}
              </div>
            </Col>
            {width <= 767 ? undefined : (
              <Col
                lg={3}
                md={3}
                sm={3}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
                xl={3}
                xs={0}
              >
                <ParagraphSmall className="no-margin" color="secondaryDark">
                  {handleDate(item.notification?.modified, lang)}
                </ParagraphSmall>
              </Col>
            )}
          </Row>
        </Td>
      </Tr>
    ))
  );
};

const Table = ({
  headers,
  data,
  outline,
  type,
  notificationTitle,
  notificationDesc,
  width,
  lang,
}) => {
  const { currentLangData } = useContext(LangContext);
  return (
    <TableContainer $outline={outline}>
      <TableStyles $outline={outline}>
        {type ? undefined : (
          <thead>
            <Tr>
              {headers.map((item, indexTh) => (
                <Th $outline={outline} key={`th${item}${indexTh}`}>
                  <Block align="center" alignItems="center" display="flex" justifyContent="center" width="100%" >
                    {item}
                  </Block>
                </Th>
              ))}
            </Tr>
          </thead>
        )}
        <tbody>
          {type
            ? renderNotificationList(
                data,
                outline,
                notificationTitle,
                notificationDesc,
                width,
                lang
              )
            : data.map((tr, trIndex) => (
                <Tr $outline={outline} key={`tr-${trIndex * 1}`}>
                  {tr.map((td, index) =>
                    index > 5 ? (
                      <StatefulTooltip
                        accessibilityType={"tooltip"}
                        content={
                          td.props?.deleteOffer
                            ? currentLangData.REWARD.delete_offer_tooltip
                            : currentLangData.REWARD.update_offer_tooltip
                        }
                        key={`td-${headers[index]}${trIndex}${index * 1}`}
                        overrides={TOOLTIP_OVERRIDE}
                        placement={PLACEMENT.top}
                      >
                        <Td $outline={outline}>{td}</Td>
                      </StatefulTooltip>
                    ) : (
                      <Td
                        $outline={outline}
                        key={`td-${headers[index]}${trIndex}${index * 1}`}
                      >
                        <Block align="center" alignItems="center" display="flex" justifyContent="center" width="100%" >
                          {td}
                        </Block>
                      </Td>
                    )
                  )}
                </Tr>
              ))}
        </tbody>
      </TableStyles>
    </TableContainer>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
  outline: PropTypes.bool,
  notificationTitle: PropTypes.string,
  notificationDesc: PropTypes.string,
  width: PropTypes.number,
  lang: PropTypes.string,
  type: PropTypes.string,
};

Table.defaultProps = {
  headers: [],
  data: [[]],
  outline: false,
};

export default React.memo(Table);
