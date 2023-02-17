// Name: Kourtney Smith
// Email: klsmith5370@gmail.com
// Hours Worked on project: 9 hrs
// I declare that the work I completed was done by myself

import * as opportunities from "./opportunities.json";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 500,
    margin: "auto",
    marginTop: theme.spacing(2),
    backgroundColor: "#8ed1fc",
    boxShadow: theme.shadows[3]
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between"
  },
  listItemText: {
    flexBasis: "33.33%"
  }
}));

export default function BasicTable() {
  /**
   * A basic table to display all non-nested information from opportunities.json
   */
  const data = opportunities.default;

  const [selectedRow, setSelectedRow] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  function handleRowClick(event, row) {
    console.log("row", row);
    setSelectedRow(row);
    setOpen(true);
  }

  function handleClose() {
    setSelectedRow(null);
    setOpen(false);
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#8ed1fc" }}>
            <TableRow>
              <TableCell align="left">Opp Name</TableCell>
              <TableCell align="left">Opp Stage</TableCell>
              <TableCell align="right">Rep Probability</TableCell>
              <TableCell align="right">PX Probability</TableCell>
              <TableCell align="left">PX Tier</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="left">Product</TableCell>
              <TableCell align="left">Sales Rep</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                onClick={(event) => handleRowClick(event, row)}
                key={row.oppId}
                sx={{
                  backgroundColor: "#7bdcb5",
                  "&:last-child td, &:last-child th": { border: 0 }
                }}
              >
                <TableCell component="th" scope="row">
                  {row.oppName}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#0693e3",
                    fontWeight: 500,
                    font: "sans-serif"
                  }}
                >
                  {row.stage}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "#0693e3",
                    fontWeight: 500,
                    font: "sans-serif"
                  }}
                >
                  {row.repProbability}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "#0693e3",
                    fontWeight: 500,
                    font: "sans-serif"
                  }}
                >
                  {row.pilytixProbability}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "#0693e3",
                    fontWeight: 500,
                    font: "sans-serif"
                  }}
                >
                  {row.pilytixTier}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "#0693e3",
                    fontWeight: 500,
                    font: "sans-serif"
                  }}
                >
                  {row.amount}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "#0693e3",
                    fontWeight: 500,
                    font: "sans-serif"
                  }}
                >
                  {row.product}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "#0693e3",
                    fontWeight: 500,
                    font: "sans-serif"
                  }}
                >
                  {row.salesRepName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedRow && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ color: "#9b51e0" }}>
            {selectedRow.oppName}
          </DialogTitle>
          <DialogContentText>
            <div>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h6" align="center">
                    {selectedRow.salesRepName}
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Stage"
                        secondary={selectedRow.stage}
                        align="left"
                        className={classes.listItemText}
                      />
                      <ListItemText
                        primary="Amount"
                        align="left"
                        secondary={selectedRow.amount}
                        className={classes.listItemText}
                      />
                      <ListItemText
                        primary="Product"
                        secondary={selectedRow.product}
                        align="center"
                        className={classes.listItemText}
                      />
                      <ListItemText
                        primary="Rep Prob"
                        secondary={selectedRow.repProbability}
                        align="right"
                        className={classes.listItemText}
                      />
                      <ListItemText
                        primary="PX Prob"
                        secondary={selectedRow.pilytixProbability}
                        align="right"
                        className={classes.listItemText}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              <br />

              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h6" align="center">
                    Pilytix Tier
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={selectedRow.pilytixTier}
                        align="center"
                        className={classes.listItemText}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              <br />

              <Card className={classes.card}>
                <Typography variant="h6" align="center">
                  Probability History
                </Typography>
                <LineChart
                  width={450}
                  height={450}
                  data={selectedRow.probabilityHistory}
                >
                  <Line
                    type="monotone"
                    dataKey="pilytixProb"
                    stroke="#00d084"
                  />
                  <XAxis
                    dataKey="daysAgo"
                    label={{ value: "Days Ago", position: "insideBottom" }}
                  />
                  <YAxis
                    dataKey="repProb"
                    label={{
                      value: "Probability",
                      angle: -90,
                      position: "insideLeft"
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid stroke="#000000" />
                  <Line type="monotone" dataKey="repProb" stroke="#9b51e0" />
                </LineChart>
              </Card>
            </div>

            <br />

            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" align="center">
                  PILYTIX Factors Increasing Win
                </Typography>
                <List>
                  {selectedRow.pilytixFactorsIncreasingWin.map((factor) => (
                    <ListItem key={factor.name}>
                      <ListItemText
                        primary={factor.name}
                        secondary={factor.message}
                        align="center"
                        className={classes.listItemText}
                      />
                      <ListItemText
                        primary={factor.weight.value}
                        secondary={factor.weight.description}
                        align="center"
                        className={classes.listItemText}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            <br />

            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" align="center">
                  PILYTIX Factors Decreasing Win
                </Typography>
                <List>
                  {selectedRow.pilytixFactorsDecreasingWin.map((factor) => (
                    <ListItem key={factor.name}>
                      <ListItemText
                        primary={factor.name}
                        secondary={factor.message}
                        align="center"
                        className={classes.listItemText}
                      />
                      <ListItemText
                        primary={factor.weight.value}
                        secondary={factor.weight.description}
                        align="center"
                        className={classes.listItemText}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
