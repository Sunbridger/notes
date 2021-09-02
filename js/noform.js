
  submit = (type) => {
    const { flow: { dynamicForm }, form } = this.props;
    form.validateFields({ force: true }, async (err, params) => {
      const { purchaseName: supplier = '' } = params.draftingSupplierName || {};
      if (params.draftingSupplierName) {
        params.draftingSupplierName = supplier;
      }
      const { purchaseName = {}, title } = params;
      const values = {
        ...params,
        ...purchaseName,
        title: Array.isArray(title) ? title.join('') : title,
      };
      function getNameByValue(data, matchCode) {
        let match = null;
        data.forEach((item) => {
          if (item.value === matchCode) {
            match = item.label;
          } else if (item.children) {
            match = getNameByValue(item.children, matchCode) || match;
          }
        });
        return match;
      }
      if (!err) {
        const fileList = [...this.props.flow.fileInfo.defaultFileList,
          ...this.props.flow.fileInfo.fileList];
        // 检测是否存在上传中的文件
        const uploadingFileNumber = fileList.filter(item => item.status === 'uploading').length;
        if (uploadingFileNumber !== 0) {
          Modal.error({
            title: '提示',
            content: `还有${uploadingFileNumber}个文件在上传中，请等待文件上传完毕！`,
          });
          return;
        }
        // 文件是必填项，则验证是否有已成功上传的文件
        const validFile = fileList.filter(item => item.status === 'done') || [];
        
        if (this.state.attachmentsNeed && validFile.length === 0) {
          Modal.error({
            title: '提示',
            content: '请上传文件！',
          });
          return;
        }
        // 修复动态附件毕传问题 !
        const { qualificationType } = this.state;
        let validFile1 = [];
        let validFile2 = [];
        if (qualificationType) {
          const fileList1 = [
            ...this.props.flow.fileInfo1.defaultFileList1,
            ...this.props.flow.fileInfo1.fileList1];
          const fileList2 = [
            ...this.props.flow.fileInfo2.defaultFileList2,
            ...this.props.flow.fileInfo2.fileList2];
          validFile1 = fileList1.filter(item => item.status === 'done') || [];
          validFile2 = fileList2.filter(item => item.status === 'done') || [];
          if (this.state.attachmentsNeed && validFile1.length === 0) {
            Modal.error({
              title: '提示',
              content: '请上传文件！',
            });
            return;
          }
          if (this.state.attachmentsNeed && validFile2.length === 0) {
            Modal.error({
              title: '提示',
              content: '请上传文件！',
            });
            return;
          }
        }
        const metaData = {
          ...values,
        };
        Object.keys(metaData).forEach((key) => {
          if (metaData[key] === undefined || metaData[key] === null) {
            metaData[key] = '';
          }
        });
        // 格式化表单数据
        dynamicForm.forEach((item) => {
          // 日期
          if (item.type === 2) {
            if (metaData[item.key]) {
              metaData[item.key] = moment(metaData[item.key]).format('YYYY-MM-DD');
            } else {
              metaData[item.key] = '';
            }
          }
          // 时间
          if ([3, 4, 13].includes(item.type)) {
            if (metaData[item.key]) {
              metaData[item.key] = moment(metaData[item.key]).format('HH:mm');
            } else {
              metaData[item.key] = '';
            }
          }
          // 日期时间
          if (item.type === 14) {
            if (metaData[item.key]) {
              metaData[item.key] = moment(metaData[item.key]).format('YYYY-MM-DD HH:mm:ss');
            } else {
              metaData[item.key] = '';
            }
          }
          // 时间区间
          if (item.type === 15) {
            if (metaData[`${item.key}_start`] && metaData[`${item.key}_end`]) {
              metaData[item.key] = `${moment(metaData[`${item.key}_start`]).format('HH:mm')}至${moment(metaData[`${item.key}_end`]).format('HH:mm')}`;
            } else {
              metaData[item.key] = '';
            }
            delete metaData[`${item.key}_start`];
            delete metaData[`${item.key}_end`];
          }
          // 日期区间
          if ([16].includes(item.type)) {
            if (metaData[`${item.key}_start`] && metaData[`${item.key}_end`]) {
              metaData[item.key] = `${moment(metaData[`${item.key}_start`]).format('YYYY-MM-DD')}至${moment(metaData[`${item.key}_end`]).format('YYYY-MM-DD')}`;
            } else {
              metaData[item.key] = '';
            }
            delete metaData[`${item.key}_start`];
            delete metaData[`${item.key}_end`];
          }
          // 日期时间区间
          if (item.type === 17) {
            if (metaData[`${item.key}_start`] && metaData[`${item.key}_end`]) {
              metaData[item.key] = `${moment(metaData[`${item.key}_start`]).format('YYYY-MM-DD HH:mm:ss')}至${moment(metaData[`${item.key}_end`]).format('YYYY-MM-DD HH:mm:ss')}`;
            } else {
              metaData[item.key] = '';
            }
            delete metaData[`${item.key}_start`];
            delete metaData[`${item.key}_end`];
          }
          // 时间段
          if ([18, 19].includes(item.type)) {
            if (metaData[`${item.key}_start`] && metaData[`${item.key}_end`]) {
              metaData[item.key] = `${moment(metaData[`${item.key}_start`]).format('HH:mm')}至${moment(metaData[`${item.key}_end`]).format('HH:mm')}`;
            } else {
              metaData[item.key] = '';
            }
            delete metaData[`${item.key}_start`];
            delete metaData[`${item.key}_end`];
          }
          // tags select
          if (item.type === 11) {
            if (item.key === 'purchaseName') {
              metaData.purchases = values.purchases;
              metaData.otherPurchaseNames = values.otherPurchaseNames;
              metaData.purchaseName = values.purchaseName;
            } else if (metaData[item.key]) {
              metaData[item.key] = metaData[item.key].join('、');
            } else {
              metaData[item.key] = '';
            }
          }
        });
        // table数据处理
        allTable.forEach((table) => {
          metaData[table] = [];
        });
        Object.keys(this.props.flow.tableData).forEach((tbKey) => {
          const rows = [];
          this.props.flow.tableData[tbKey].forEach((tbRow) => {
            delete tbRow.formValue.undefined;
            // 设置空值，防止序列化后key值丢失
            Object.keys(tbRow.formValue).forEach((tk) => {
              if (tbRow.formValue[tk] === undefined) {
                tbRow.formValue[tk] = null;
              }
            });
            rows.push(tbRow.formValue);
          });
          metaData[tbKey] = rows;
        });
        // 表格必填校验
        let subStr = '';
        let subRequiredAndValueNull;
        // 货物工程服务三选一
        let threeToOne = ['GoodsInfoTab', 'infoOfEngSubMatter', 'infoOfServiceObject'];
        if (requiredTable.includes(threeToOne[0]) && requiredTable.includes(threeToOne[1])
          && requiredTable.includes(threeToOne[2])) {
          const empTyTable = requiredTable.reduce((prev, cur, i) => {
            if ((!Array.isArray(metaData[cur]) || !metaData[cur].length) &&
              threeToOne.includes(cur)) {
              prev.push(requiredTableName[i]);
            }
            return prev;
          }, []);

          if (empTyTable.length === 3) {
            message.error(`${empTyTable.join('、')}三个中至少必须填写一个！`);
            return;
          }
        }
        const nullableTableName = requiredTable.reduce((str, cur, i) => {
          if (str) {
            return str;
          }
          // 必填表格没有数据并且必填表格不为货物，工程，服务三个中的一个
          if ((!Array.isArray(metaData[cur]) || !metaData[cur].length) &&
            !threeToOne.includes(cur)) {
            return requiredTableName[i];
          }
          const { gpCatalogStartChart } = this.state;
          if (gpCatalogStartChart === 'A') {
            threeToOne = ['infoOfEngSubMatter', 'infoOfServiceObject'];
          }
          if (gpCatalogStartChart === 'B') {
            threeToOne = ['GoodsInfoTab', 'infoOfServiceObject'];
          }
          if (gpCatalogStartChart === 'C') {
            threeToOne = ['GoodsInfoTab', 'infoOfEngSubMatter'];
          }
          // 必填表格列校验
          if (requiredTableCols[cur] && !threeToOne.includes(cur)) {
            subRequiredAndValueNull = false;
            subStr = requiredTableCols[cur].reduce((s, c) => {
              if (s) return s;
              if (c.nullable === 2) {
                metaData[cur].forEach((item) => {
                  subRequiredAndValueNull = subRequiredAndValueNull || !item[c.key];
                });
                return subRequiredAndValueNull ? c.name : '';
              }
              return '';
            }, '');
            if (subStr) {
              return `表格${requiredTableName[i]}的${subStr}列`;
            }
          }
          return '';
        }, '');
        if (nullableTableName) {
          message.error(`${nullableTableName}不可为空`);
          return;
        }
        // 单一来源公示，预算金额需要必填并大于0
        if (this.routerInfo.announcementType === '3012') {
          if (metaData.biddingProject.length === 0) {
            message.warning('请填写采购项目概况');
            return;
          }
          const isInvalid = metaData.biddingProject.some((item) => {
            return isNaN(item.budgetPrice) || item.budgetPrice <= 0;
          });
          if (isInvalid) {
            message.warning('采购项目概况 - 预算金额不能为空或小于0');
            return;
          }
        }
        // 采购方式、采购类型、采购目录获取label值（存在有初始值情况，必须手动递归获取）
        const { cgfs, cglx, cgml } = this.props.flow;
        if (metaData.procurementMethod) {
          metaData.procurementMethodCode = metaData.procurementMethod;
          metaData.procurementMethod = getNameByValue(cgfs, metaData.procurementMethodCode) || '';
        }
        if (metaData.procurementType) {
          metaData.procurementTypeCode = metaData.procurementType;
          metaData.procurementType = getNameByValue(cglx, metaData.procurementTypeCode) || '';
        }
        if (metaData.gpCatalogName && Array.isArray(metaData.gpCatalogName)) {
          metaData.gpCatalogCode = metaData.gpCatalogName.join(',');
          metaData.gpCatalogName = metaData.gpCatalogName.map(item => (getNameByValue(cgml, item) || ''));
          metaData.gpCatalogName = metaData.gpCatalogName.join(',');
        }
        // 更正公告所选关联公告
        this.glgg = this.state.glggList.find(item => item.outUrl === metaData.relateOldNotice);
        this.setState({
          submiting: type,
        });
        // 是否加密字段
        /* eslint no-prototype-builtins: 0 */
        if (metaData.hasOwnProperty('isSecret')) {
          metaData.secret = metaData.isSecret === '1';
          delete metaData.isSecret;
        }
        // 关联项目编号，存在的话已逗号分隔
        const planNum = metaData.procurementPlanNumber;
        if (Array.isArray(planNum)) {
          metaData.procurementPlanNumber = planNum.join(',');
        }
        // 处理项目所在行政区划、编码
        if (metaData.disForPro) {
          metaData.districtCode = metaData.disForPro;
          metaData.districtName = this.disNameForPro;
          delete metaData.disForPro;
        }
        // 附件
        const attachments = [];
        validFile.forEach((fl) => {
          attachments.push({
            fileId: fl.fileId,
            isShow: !(fl.noPublic === true),
            name: fl.name,
            size: fl.size,
          });
        });
        if (qualificationType) {
          validFile1.forEach((fl) => {
            attachments.push({
              fileId: fl.fileId,
              isShow: !(fl.noPublic === true),
              name: fl.name,
              size: fl.size,
            });
          });
          validFile2.forEach((fl) => {
            attachments.push({
              fileId: fl.fileId,
              isShow: !(fl.noPublic === true),
              name: fl.name,
              size: fl.size,
            });
          });
        }
        // appCode回传
        let appCode;
        const appCodeItem = dynamicForm.find(item => item.key === 'appCode');
        if (appCodeItem) {
          appCode = appCodeItem.value;
        }
        // 公告标识
        const { markingList, supportCheckerMultiSelect } = this.state;
        const selectMarking = markingList.filter(item => item.isChoosed && item.type === 2);
        const identificationIds = selectMarking.map(item => item.id);
        // 校验 社会信用代码
        const { error: errorMSG } = await checkSocialCreditCode({
          announcementType: this.routerInfo.announcementType,
          metadata: metaData,
        });
        if (errorMSG) {
          this.setState({
            submiting: 0,
          });
          return message.error(errorMSG);
        }
        // 公告预览
        if (type === 1) {
          this.getNextTaskUser(metaData.district);
          this.props.dispatch({
            type: 'flow/getAnnouncementContent',
            payload: {
              announcementType: this.routerInfo.announcementType,
              metaData: JSON.stringify(metaData),
              district: this.routerInfo.districtId || undefined,
            },
          }).then((res) => {
            this.setState({
              submiting: 0,
            });
            if (res.result !== null) {
              this.setState({
                preview: true,
                editable: false,
              });
              if (this.glgg) {
                res.result = res.result.replace(this.glgg.outUrl, `<a href="${this.glgg.outUrl}" target= "_blank">${this.glgg.title}</a>`);
              }
              this.ueditor?.setContent(res.result);
              this.listSensitiveWords({
                title: values.title,
                content: res.result,
                district: metaData.district || metaData.districtCode,
                type,
              });
              this.ueditor?.setDisabled('fullscreen');
              // 生成公告即暂存
              // 修复table预览无边框样式
              let content = res.result;
              const fixTableStyle = '<style id="fixTableStyle" type="text/css">table {border-spacing:0}th,td {border:1px solid #DDD;padding: 5px 10px;}</style>';
              const hasFixed = content.indexOf('fixTableStyle');
              if (hasFixed === -1) {
                content = fixTableStyle + content;
              }
              this.getConfig({
                announcementType: this.routerInfo.announcementType,
                districtCode: values.district,
                metadata: metaData,
              });
              this.setState({
                submiting: 0,
              });
              // 公告暂存
              // tempSaveAnnouncement({
              //   id: this.id,
              //   announcementType: this.routerInfo.announcementType,
              //   attachments,
              //   content,
              //   description: '',
              //   district: values.district,
              //   title: values.title,
              //   metaData: JSON.stringify(metaData),
              //   projectCode: this.routerInfo.projectCode || values.projectCode || '',
              //   projectName: this.routerInfo.projectName || values.projectName || '',
              //   pubType: this.state.pubType,
              //   releasedAt: values.releasedAt || '',
              //   serialNum: this.routerInfo.orderId || '',
              //   showDuration: (this.showDuration === null || this.showDuration === undefined)
              // ? '': this.showDuration,
              //   url: '',
              //   appCode,
              //   identificationIds,
              // }).then((res1) => {
              //   this.setState({
              //     submiting: 0,
              //   });
              //   if (res1.success) {
              //     this.id = res1.result;
              //   } else {
              //     Modal.error({
              //       title: '提示',
              //       content: res1.error,
              //     });
              //   }
              //   // this.getConfig({
              //   //   announcementType: this.routerInfo.announcementType,
              //   //   districtCode: values.district,
              //   //   metadata: JSON.stringify(metaData)
              //   // });
              // });
            } else {
              message.error('参数错误');
            }
          });
        }
        // 修复table预览无边框样式
        let content = this.ueditor?.getContent();
        const fixTableStyle = '<style id="fixTableStyle" type="text/css">table {border-spacing:0}th,td {border:1px solid #DDD;padding: 5px 10px;}</style>';
        const hasFixed = content.indexOf('fixTableStyle');
        if (hasFixed === -1) {
          content = fixTableStyle + content;
        }
        // 公告暂存-手动
        if (type === 2) {
          this.setState({
            submiting: 0,
          });
          this.listSensitiveWords({
            title: values.title,
            content,
            district: metaData.district,
            cb: () => {
              this.setState({
                submiting: 2,
              });
              tempSaveAnnouncement({
                id: this.id,
                announcementType: this.routerInfo.announcementType,
                attachments,
                content: this.backSensitiveWords(content),
                description: '',
                district: values.district,
                title: values.title,
                metaData: JSON.stringify(metaData),
                projectCode: this.routerInfo.projectCode || values.projectCode || '',
                projectName: this.routerInfo.projectName || values.projectName || '',
                pubType: this.state.pubType,
                releasedAt: values.releasedAt || '',
                serialNum: this.routerInfo.orderId || '',
                showDuration: (this.showDuration === null || this.showDuration === undefined) ? '' : this.showDuration,
                url: '',
                appCode,
                identificationIds,
              }).then((res) => {
                this.setState({
                  submiting: 0,
                });
                if (res.success) {
                  this.id = res.result;
                  Modal.success({
                    title: '提示',
                    content: '暂存成功！',
                  });
                } else {
                  Modal.error({
                    title: '提示',
                    content: res.error,
                  });
                }
              });
            },
          });
        }
        // 公告提交
        if (type === 3) {
          const json = {
            id: this.id,
            announcementType: this.routerInfo.announcementType,
            attachments,
            content,
            description: '',
            district: values.district,
            title: values.title,
            metaData: JSON.stringify(metaData),
            projectCode: this.routerInfo.projectCode || values.projectCode || '',
            projectName: this.routerInfo.projectName || values.projectName || '',
            pubType: this.state.pubType,
            releasedAt: values.releasedAt || '',
            serialNum: this.routerInfo.orderId || '',
            showDuration: (this.showDuration === null ||
              this.showDuration === undefined) ? '' : this.showDuration,
            url: '',
            // nextTaskUserId: this.nextTaskUserId,
            appCode,
            identificationIds,
          };
          if (supportCheckerMultiSelect) {
            json.nextTaskUserIds = Array.isArray(this.nextTaskUserId)
              ? this.nextTaskUserId : [this.nextTaskUserId];
          } else {
            json.nextTaskUserId = this.nextTaskUserId;
          }
          const tasks = [];
          const needShowFiles = attachments.filter(fl => fl.isShow);
          let html = '';
          if (needShowFiles.length > 0) {
            html = '<divider></divider><p style="white-space: normal; line-height: 24px;"><strong><span style="line-height: 24px; font-family: 宋体;">附件信息:</span></strong></p>';
            needShowFiles.forEach((fl) => {
              tasks.push(getDownLoadUrl({
                fileId: fl.fileId,
                bizCode: '1014',
              }).then((res) => {
                fl.url = res.result;
              }));
            });
            // 获取文件url地址，拼接模板
            Promise.all(tasks).then(() => {
              html += needShowFiles.map((fl) => {
                let fileSize = '';
                if (fl.size) {
                  fl.size = parseInt(fl.size, 10);
                  fileSize = '0.1 KB';
                  const fileSizeK = (fl.size / 1024).toFixed(1);
                  if (fileSizeK.split('.')[1] > 0) {
                    fileSize = `${fileSizeK} KB`;
                  }
                  if (fileSizeK.split('.')[0] > 1000) {
                    const fileSizeM = (fl.size / 1024 / 1024).toFixed(1);
                    fileSize = `${fileSizeM} M`;
                  }
                }
                return `<ul class="fjxx" style="font-size: 16px;margin-left: 38px;color: #0065ef;list-style-type: none;"><li><p style="display:inline-block"><a href="${fl.url}">${fl.name}</a></p><p style="display:inline-block;margin-left:20px">${fileSize}</p></li></ul>`;
              }).join('');
              json.content += html;
              this.submitAnn(json);
            });
          } else {
            this.submitAnn(json);
          }
        }
      } else {
        message.warning('请完善信息！');
      }
    });
  }