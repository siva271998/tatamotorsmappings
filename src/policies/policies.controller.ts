import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';

@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) { }

  @Post('create')
  create(@Body() createPolicyDto: CreatePolicyDto) {
    return this.policiesService.create(createPolicyDto);
  }

  @Post('fetchPoliciesTable')
  findAll(@Body() policyYear) {
    return this.policiesService.policies(policyYear);
  }

  @Post('getAllpolicies')
  getpolicies() {
    return this.policiesService.getAllpolicies();
  }

  @Post("snapShotDropDown")
  snapShotDropDown(@Body() payload) {
    return this.policiesService.snapShotDropDown(payload)
  }

  @Post("snapShotTable")
  policySnapShot(@Body() payload) {
    return this.policiesService.policySnapShot(payload)
  }

  @Post('findOne')
  findOne(@Body() createPolicyDto: CreatePolicyDto) {
    return this.policiesService.findOne(createPolicyDto);
  }



  @Post('update')
  update(@Body() updatePolicyDto: UpdatePolicyDto) {
    return this.policiesService.update(updatePolicyDto);
  }

  @Post('remove')
  remove(@Body() createPolicyDto: CreatePolicyDto) {
    return this.policiesService.remove(createPolicyDto);
  }
}
