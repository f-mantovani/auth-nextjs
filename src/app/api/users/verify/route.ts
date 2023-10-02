import { NextResponse, NextRequest } from 'next/server'
import { connect } from '@/dbConfig'
import User from '@/models/User.model'

connect()
