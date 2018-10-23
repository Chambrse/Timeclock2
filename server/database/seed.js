const dbConnection = require('.');
const User = require('../database/models/user');

User.create([{
  companyName: 'Adventurers, Inc.',
  position: 'CEO',
  manager: null,
  username: 'SamGamgee89',
  city: 'Bag end',
  country: 'The Shire',
  postalCode: '12345',
  brand: 'We\'ll complete your quest before second breakfast!',
  email: 'SamGamgee89@MiddleEarthNet.net',
  adminFirstName: 'Sam',
  adminLastName: 'Gamgee',
  password: 'Avengers!1',
  status: false,
  employeeType: 'admin',
  timeClockData: [
    {
      time: new Date('2018-10-23T22:11:07.223Z'),
      coords: {
        lat: 33.55536,
        lng: -111.8076928,
      },
      clockType: 'clockOut',
    },
    {
      time: new Date('2018-10-23T21:11:07.223Z'),
      coords: {
        lat: 33.345536,
        lng: -111.8076928,
      },
      clockType: 'clockIn',
    },
    {
      time: new Date('2018-10-22T22:11:07.223Z'),
      coords: {
        lat: 33.345536,
        lng: -111.8076928,
      },
      clockType: 'clockOut',
    },
    {
      time: new Date('2018-10-22T21:11:07.223Z'),
      coords: {
        lat: 33.345536,
        lng: -111.8076928,
      },
      clockType: 'clockIn',
    },
  ],
},
{
  companyName: 'Adventurers, Inc.',
  position: 'Ringbearer',
  manager: 'SamGamgee89',
  username: 'Froggins',
  city: 'Bag end',
  country: 'The Shire',
  postalCode: '12345',
  brand: 'We\'ll complete your quest before second breakfast!',
  email: 'Froggins@MiddleEarthNet.net',
  adminFirstName: 'Frodo',
  adminLastName: 'Baggins',
  password: 'Avengers!1',
  status: false,
  employeeType: 'employee',
  timeClockData: [
    {
      time: new Date('2018-10-23T22:11:07.223Z'),
      coords: {
        lat: 33.345536,
        lng: -111.8076928,
      },
      clockType: 'clockIn',
    },
    {
      time: new Date('2018-10-23T22:11:07.223Z'),
      coords: {
        lat: 33.55536,
        lng: -111.8076928,
      },
      clockType: 'clockOut',
    },
    {
      time: new Date('2018-10-23T21:11:07.223Z'),
      coords: {
        lat: 33.345536,
        lng: -111.8076928,
      },
      clockType: 'clockIn',
    },
    {
      time: new Date('2018-10-22T22:11:07.223Z'),
      coords: {
        lat: 33.345536,
        lng: -111.8076928,
      },
      clockType: 'clockOut',
    },
    {
      time: new Date('2018-10-22T21:11:07.223Z'),
      coords: {
        lat: 33.345536,
        lng: -111.8076928,
      },
      clockType: 'clockIn',
    },
  ],
},
{
  companyName: 'Adventurers, Inc.',
  position: 'Wizard',
  manager: 'SamGamgee89',
  username: 'Smokerings21',
  city: 'Bag end',
  country: 'The Shire',
  postalCode: '12345',
  brand: 'We\'ll complete your quest before second breakfast!',
  email: 'GandalfTheWhite@MiddleEarthNet.net',
  adminFirstName: 'Gandalf',
  adminLastName: 'The Grey',
  password: 'Avengers!1',
  status: false,
  employeeType: 'employee',
  timeClockData: [
    {
      time: new Date('2018-10-23T22:11:07.223Z'),
      coords: {
        lat: 33.345536,
        lng: -111.9076928,
      },
      clockType: 'clockIn',
    },
    {
      time: new Date('2018-10-23T22:11:07.223Z'),
      coords: {
        lat: 33.55536,
        lng: -111.8076928,
      },
      clockType: 'clockOut',
    },
    {
      time: new Date('2018-10-23T21:11:07.223Z'),
      coords: {
        lat: 33.345536,
        lng: -111.8076928,
      },
      clockType: 'clockIn',
    },
    {
      time: new Date('2018-10-22T22:11:07.223Z'),
      coords: {
        lat: 33.345536,
        lng: -111.8076928,
      },
      clockType: 'clockOut',
    },
    {
      time: new Date('2018-10-22T21:11:07.223Z'),
      coords: {
        lat: 33.345536,
        lng: -111.8076928,
      },
      clockType: 'clockIn',
    },
  ],
},
{
  companyName: 'Adventurers, Inc.',
  position: 'Evil Guy',
  manager: 'SamGamgee89',
  username: 'OneRing4Evr',
  city: 'Bag end',
  country: 'The Shire',
  postalCode: '12345',
  brand: 'We\'ll complete your quest before second breakfast!',
  email: 'TheEyeOfSauron@MiddleEarthNet.net',
  adminFirstName: 'Sauron',
  adminLastName: '',
  password: 'Avengers!1',
  status: false,
  employeeType: 'employee',
  timeClockData: [
    {
      time: new Date('2018-10-23T22:11:07.223Z'),
      coords: {
        lat: 33.455536,
        lng: -111.9076928,
      },
      clockType: 'clockIn',
    },
  ],
}]).then((result) => {
  console.log('Database Seeded!');
  console.log('admin username: SamGamgee89');
  console.log('admin password: Avengers1!');
  dbConnection.close();
}).catch(err => console.log(err));
